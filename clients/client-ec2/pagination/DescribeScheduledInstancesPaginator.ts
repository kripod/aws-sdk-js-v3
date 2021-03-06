import { EC2 } from "../EC2";
import { EC2Client } from "../EC2Client";
import {
  DescribeScheduledInstancesCommand,
  DescribeScheduledInstancesCommandInput,
  DescribeScheduledInstancesCommandOutput,
} from "../commands/DescribeScheduledInstancesCommand";
import { EC2PaginationConfiguration } from "./Interfaces";
import { Paginator } from "@aws-sdk/types";

const makePagedClientRequest = async (
  client: EC2Client,
  input: DescribeScheduledInstancesCommandInput,
  ...args: any
): Promise<DescribeScheduledInstancesCommandOutput> => {
  // @ts-ignore
  return await client.send(new DescribeScheduledInstancesCommand(input), ...args);
};
const makePagedRequest = async (
  client: EC2,
  input: DescribeScheduledInstancesCommandInput,
  ...args: any
): Promise<DescribeScheduledInstancesCommandOutput> => {
  // @ts-ignore
  return await client.describeScheduledInstances(input, ...args);
};
export async function* paginateDescribeScheduledInstances(
  config: EC2PaginationConfiguration,
  input: DescribeScheduledInstancesCommandInput,
  ...additionalArguments: any
): Paginator<DescribeScheduledInstancesCommandOutput> {
  let token: string | undefined = config.startingToken || undefined;
  let hasNext = true;
  let page: DescribeScheduledInstancesCommandOutput;
  while (hasNext) {
    input.NextToken = token;
    input["MaxResults"] = config.pageSize;
    if (config.client instanceof EC2) {
      page = await makePagedRequest(config.client, input, ...additionalArguments);
    } else if (config.client instanceof EC2Client) {
      page = await makePagedClientRequest(config.client, input, ...additionalArguments);
    } else {
      throw new Error("Invalid client, expected EC2 | EC2Client");
    }
    yield page;
    token = page.NextToken;
    hasNext = !!token;
  }
  // @ts-ignore
  return undefined;
}
