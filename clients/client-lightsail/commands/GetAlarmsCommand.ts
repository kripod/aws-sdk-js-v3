import { LightsailClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../LightsailClient";
import { GetAlarmsRequest, GetAlarmsResult } from "../models/models_0";
import { deserializeAws_json1_1GetAlarmsCommand, serializeAws_json1_1GetAlarmsCommand } from "../protocols/Aws_json1_1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { HttpRequest as __HttpRequest, HttpResponse as __HttpResponse } from "@aws-sdk/protocol-http";
import { Command as $Command } from "@aws-sdk/smithy-client";
import {
  FinalizeHandlerArguments,
  Handler,
  HandlerExecutionContext,
  MiddlewareStack,
  HttpHandlerOptions as __HttpHandlerOptions,
  MetadataBearer as __MetadataBearer,
  SerdeContext as __SerdeContext,
} from "@aws-sdk/types";

export type GetAlarmsCommandInput = GetAlarmsRequest;
export type GetAlarmsCommandOutput = GetAlarmsResult & __MetadataBearer;

export class GetAlarmsCommand extends $Command<
  GetAlarmsCommandInput,
  GetAlarmsCommandOutput,
  LightsailClientResolvedConfig
> {
  // Start section: command_properties
  // End section: command_properties

  constructor(readonly input: GetAlarmsCommandInput) {
    // Start section: command_constructor
    super();
    // End section: command_constructor
  }

  resolveMiddleware(
    clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>,
    configuration: LightsailClientResolvedConfig,
    options?: __HttpHandlerOptions
  ): Handler<GetAlarmsCommandInput, GetAlarmsCommandOutput> {
    this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));

    const stack = clientStack.concat(this.middlewareStack);

    const { logger } = configuration;
    const clientName = "LightsailClient";
    const commandName = "GetAlarmsCommand";
    const handlerExecutionContext: HandlerExecutionContext = {
      logger,
      clientName,
      commandName,
      inputFilterSensitiveLog: GetAlarmsRequest.filterSensitiveLog,
      outputFilterSensitiveLog: GetAlarmsResult.filterSensitiveLog,
    };

    if (typeof logger.info === "function") {
      logger.info({
        clientName,
        commandName,
      });
    }

    const { requestHandler } = configuration;
    return stack.resolve(
      (request: FinalizeHandlerArguments<any>) =>
        requestHandler.handle(request.request as __HttpRequest, options || {}),
      handlerExecutionContext
    );
  }

  private serialize(input: GetAlarmsCommandInput, context: __SerdeContext): Promise<__HttpRequest> {
    return serializeAws_json1_1GetAlarmsCommand(input, context);
  }

  private deserialize(output: __HttpResponse, context: __SerdeContext): Promise<GetAlarmsCommandOutput> {
    return deserializeAws_json1_1GetAlarmsCommand(output, context);
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}
