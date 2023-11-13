import React, { useEffect, ReactNode } from "react";
import { useMachine } from "@xstate/react";
import {
  TransactionPagination,
  TransactionResponseItem,
  TransactionDateRangePayload,
  TransactionAmountRangePayload,
} from "../models";
import { Link as RouterLink } from "react-router-dom";
import TransactionList from "./TransactionList";
import { publicTransactionsMachine } from "../machines/publicTransactionsMachine";
import { makeStyles, Button } from "@material-ui/core";
import { BarChart as BarChartIcon } from "@material-ui/icons";
import { debounce } from "lodash/fp";

export interface TransactionPublicListProps {
  filterComponent: ReactNode;
  dateRangeFilters: TransactionDateRangePayload;
  amountRangeFilters: TransactionAmountRangePayload;
}

const TransactionPublicList: React.FC<TransactionPublicListProps> = ({
  filterComponent,
  dateRangeFilters,
  amountRangeFilters,
}) => {
  const [current, send, publicTransactionService] = useMachine(publicTransactionsMachine);
  const { pageData, results } = current.context;

  // @ts-ignore
  if (window.Cypress) {
    // @ts-ignore
    window.publicTransactionService = publicTransactionService;
  }

  useEffect(() => {
    setTimeout(() => {
      send("FETCH", { ...dateRangeFilters, ...amountRangeFilters });
    }, 1000);
  }, [send, dateRangeFilters, amountRangeFilters]);

  const loadNextPage = debounce(3000, (page: number) =>
    send("FETCH", { page, ...dateRangeFilters, ...amountRangeFilters })
  );

  return (
    <>
      <TransactionList
        filterComponent={filterComponent}
        header="Public"
        transactions={results as TransactionResponseItem[]}
        isLoading={current.matches("loading")}
        loadNextPage={loadNextPage}
        pagination={pageData as TransactionPagination}
        showCreateButton
      />
    </>
  );
};

export default TransactionPublicList;
