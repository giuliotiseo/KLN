import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCompanyByAdmin, searchEmployers } from "../../company/api/fetch";
import { directUpdateOfCompany, updateCompanyInfo } from "../../company/api/update";
import { generateLegacyLogList } from "../../globals/libs/helpers";

export const getCompanyInfoThunk = createAsyncThunk(
  'company/get',
  async (userFromCognito, { rejectWithValue }) => {
    const companyId = userFromCognito.attributes["custom:companyId"];
    try {
      const result = await fetchCompanyByAdmin(companyId);
      return result;
    } catch(err) {
      console.error(err);
      return rejectWithValue(err);
    }
  }
)

export const updateCompanyInfoThunk = createAsyncThunk(
  'company/update',
  async ({ company, logo, prevCompany }, { rejectWithValue }) => {
    try {
      const result = await updateCompanyInfo(company, logo, prevCompany);
      return result;
    } catch(err) {
      console.error(err);
      return rejectWithValue(err);
    }
  }
)

export const importLogsIntoCompanyThunk = createAsyncThunk(
  'company/import_logs',
  async ({ action, subject }, store) => {
    const { company } = store.getState();
    const { companyId, log, vatNumber, tag, name, owner } = company.companyInfo.entity;

    const generatedLog = await generateLegacyLogList({
      list: log,
      action,
      subject,
    });

    try {
      const result = await directUpdateOfCompany({ companyId, vatNumber, tag, name, owner, log: generatedLog });
      if(!result?.log) throw new Error("Impossible to find any logs");
      return result.log;
    } catch(err) {
      console.error(err);
      return store.rejectWithValue(err);
    }
  }
)

// Thunks for UI List
export const searchEmployersThunk = createAsyncThunk(
  'company/employers/list',
  async ({ companyId, queryOptions }, { rejectWithValue }) => {
    const result = await searchEmployers({ companyId, ...queryOptions, nextToken: undefined });
    if(!result) throw rejectWithValue({ error: "No result in search contacts by tenant", queryOptions, result })
    return result;
  }
)

export const nextSearchEmployersThunk = createAsyncThunk(
  'company/employers/next',
  async ({ companyId, nextToken }, { getState, rejectWithValue }) => {
    console.log('Lancio il next', {companyId, nextToken })
    const { company: { employersList: { queryOptions }}} = getState();
    const result = await searchEmployers({ companyId, ...queryOptions, nextToken });
    console.log('Vedo il result', result)

    if(!result) throw rejectWithValue({ error: "No result next search contacts by tenant", result })
    return result;
  }
)
