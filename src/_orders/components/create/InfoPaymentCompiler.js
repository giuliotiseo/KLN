import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Paragraph, SmallParagraph } from "../../../globals/components/typography/paragraphs";
import { SmallTitle } from "../../../globals/components/typography/titles";
// Helpers
import { PAYMENT_CONDITION_DESCRIPTION, PaymentCondition } from "../../libs/helpers";
// Icons
import { RiMoneyEuroCircleLine } from "react-icons/ri";
import { useCallback } from "react";
import { searchContacts } from "../../../contacts/api/fetch";
import { selectTenant } from "../../../company/slices/companyInfoSlice";
import { useState } from "react";

const paymentMethodDirection = {
  "FRANCO": "sender",
  "ASSEGNATO": "receiver"
}

const InfoPaymentCompilerModule = ({ paymentCondition, customer, loading, updateForm }) => {
  return (
    <>
      <label htmlFor="paymentCondition" className="label">Condizioni di pagamento</label>
      <select name="paymentCondition" id="paymentCondition" onChange={updateForm} defaultValue={paymentCondition} className="input w-full">
        { Object.keys(PaymentCondition).map(pc => <option key={pc} value={pc}>{PAYMENT_CONDITION_DESCRIPTION[pc].short}</option>)}
      </select>
      <SmallParagraph styles="my-2 mx-1">{PAYMENT_CONDITION_DESCRIPTION[paymentCondition].long}</SmallParagraph>
      <SmallTitle styles="my-4">Controlla i dati</SmallTitle>
      <div className="flex">
        <div className="flex-1 mr-4">
          <label className="label" htmlFor="customer.name">Ragione sociale</label>
          <input
            id="customer.name"
            type="text"
            name="customer.name"
            value={customer.name}
            onChange={updateForm}
            className="flex w-full input"
            disabled={loading}
          />
        </div>

        <div className="flex-1 mr-4">
          <label className="label" htmlFor="customer.vatNumber">Partita IVA</label>
          <input
            type="text"
            name="customer.vatNumber"
            value={customer.vatNumber}
            onChange={updateForm}
            className="flex w-full input"
            disabled={loading}
          />
        </div>
      </div>
      <div className="flex mt-4">
        <div className="flex-1 mr-4">
          <label className="label" htmlFor="customer.pec">PEC</label>
          <input
            type="text"
            name="customer.pec"
            value={customer.pec}
            onChange={updateForm}
            className="flex w-full input"
            disabled={loading}
          />
        </div>

        <div className="flex-1 mr-4">
          <label className="label" htmlFor="customer.uniqueCode">Codice univoco</label>
          <input
            type="text"
            name="customer.uniqueCode"
            value={customer.uniqueCode}
            onChange={updateForm}
            className="flex w-full input"
          />
        </div>
      </div>
    </>
  ) 
}

export default function InfoPaymentCompiler({ order, updateForm, showCompiler }) {
  const [ loading, setLoading ] = useState(false);
  const { paymentCondition, customer } = order;
  const tenant = useSelector(selectTenant);

  const searchInContactsFromPreOrder = useCallback(async (company) => {
    setLoading(true);
    // { tenant, type, searchable, job, employee,  email, vatNumber, sortDirection, nextToken, limit }
    const result = await searchContacts({
      tenant,
      type: "CLIENT",
      vatNumber: company.vatNumber,
      searchable: company.name.toLowerCase()
    });

    updateForm({ target: { name: "customer", type: "copypaste", value: { ...result.entities[result.ids[0]] }}});
    setLoading(false);
  }, [order.preOrderId, order.sender, order.receiver, paymentCondition]);

  useEffect(() => {
    if(order[paymentMethodDirection[paymentCondition]]) {
      const companyTarget = order[paymentMethodDirection[paymentCondition]];

      // From Pre-Order + Porto franco
      if(companyTarget?.vatNumber && order?.preOrderId) {
        // Search in contacts from the sender's vatnumber
        searchInContactsFromPreOrder({ ...companyTarget, vatNumber: order.preOrderId.split("_")[2] });
      }

      // From Contacts
      if(companyTarget?.id) {
        searchInContactsFromPreOrder({ ...companyTarget });
      }

      // From Remote
      if(companyTarget?.companyId) {
        searchInContactsFromPreOrder({ ...companyTarget });
      }
    }
  }, [order.preOrderId, order.sender, order.receiver, paymentCondition]);

  return (
    <div>
      <SmallTitle styles="mb-2 flex items-center">
        <RiMoneyEuroCircleLine className="mr-1 text-2xl" />
        <span>Info di fatturazione</span>
      </SmallTitle>

      { showCompiler 
        ? <InfoPaymentCompilerModule
            paymentCondition={paymentCondition}
            customer={customer}
            updateForm={updateForm}
            loading={loading}
          /> 
        : <Paragraph styles="alert-info px-4 mt-4">
          Indica le informazioni di ritiro e consegna per procedere
        </Paragraph>
      } 
    </div>
  )
}