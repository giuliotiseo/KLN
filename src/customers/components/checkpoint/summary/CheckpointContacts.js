import Avatar from "../../../../globals/components/layout/Avatar";
// import  { FiUploadCloud } from "react-icons/fi";

export default function CheckpointContacts({
  checkpoint,
  // runCreateContact,
  // allContactsIds,
  className = ""
}) {
  // const status = useSelector(selectStatusContactsList);
  // const handleCreateContactOnTheFly = (c) => {
  //   runCreateContact({ ...c, type: "WAREHOUSE" }, true, true)
  // }

  return (
    <section className={className}>
      <h4 className="title-4">Referenti</h4>
      { !checkpoint?.contacts || checkpoint?.contacts?.length <= 0
          ? <p className="text-gray-400 dark:text-gray-500">Nessun referente selezionato</p>
          : <div className="flex flex-col mt-2">{checkpoint?.contacts?.map((c, index) => (
            <div
              key={index} data-tip={c.name}
              className="flex items-center mb-2"
            >
              <Avatar
                name={c?.name || null}
                size={40}
                stepColor={40}
                src={c?.avatar || null}
              />

              {/* <ContactAvatar avatar={c.avatar} size="w-8 h-8" styles="mt-1" type={"WAREHOUSE"} /> */}
              <div className="ml-1">
                <p>{c?.name} {c?.surname}</p>
                <p>{c?.email} - {c?.phone}</p>
                {/* { !allContactsIds.filter(id => id.includes(c.email)).length > 0 && status !== "pending" && ( 
                  <button
                    data-tip="Salva in rubrica"
                    // onClick={() => handleCreateContactOnTheFly(c)}
                    onClick={() => console.log("Salva")}
                    className="text-base inline-flex mt-2 text-primary-100 hover:text-primary-300 dark:text-primary-300 dark:hover:text-primary-200"
                  >
                    <FiUploadCloud />
                  </button>
                )} */}

                {/* { status === "pending" && (
                  <InlineSpinner loading={status === "pending"} />
                )} */}
              </div>
            </div>
          ))}
      </div>
      }
    </section>
  )
}