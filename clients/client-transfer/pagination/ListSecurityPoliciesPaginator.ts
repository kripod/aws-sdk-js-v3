import { Transfer } from "../Transfer";
import { TransferClient } from "../TransferClient";
import {
  ListSecurityPoliciesCommand,
  ListSecurityPoliciesCommandInput,
  ListSecurityPoliciesCommandOutput,
} from "../commands/ListSecurityPoliciesCommand";
import { TransferPaginationConfiguration } from "./Interfaces";
import { Paginator } from "@aws-sdk/types";

const makePagedClientRequest = async (
  client: TransferClient,
  input: ListSecurityPoliciesCommandInput,
  ...args: any
): Promise<ListSecurityPoliciesCommandOutput> => {
  // @ts-ignore
  return await client.send(new ListSecurityPoliciesCommand(input), ...args);
};
const makePagedRequest = async (
  client: Transfer,
  input: ListSecurityPoliciesCommandInput,
  ...args: any
): Promise<ListSecurityPoliciesCommandOutput> => {
  // @ts-ignore
  return await client.listSecurityPolicies(input, ...args);
};
export async function* paginateListSecurityPolicies(
  config: TransferPaginationConfiguration,
  input: ListSecurityPoliciesCommandInput,
  ...additionalArguments: any
): Paginator<ListSecurityPoliciesCommandOutput> {
  let token: string | undefined = config.startingToken || undefined;
  let hasNext = true;
  let page: ListSecurityPoliciesCommandOutput;
  while (hasNext) {
    input.NextToken = token;
    input["MaxResults"] = config.pageSize;
    if (config.client instanceof Transfer) {
      page = await makePagedRequest(config.client, input, ...additionalArguments);
    } else if (config.client instanceof TransferClient) {
      page = await makePagedClientRequest(config.client, input, ...additionalArguments);
    } else {
      throw new Error("Invalid client, expected Transfer | TransferClient");
    }
    yield page;
    token = page.NextToken;
    hasNext = !!token;
  }
  // @ts-ignore
  return undefined;
}
