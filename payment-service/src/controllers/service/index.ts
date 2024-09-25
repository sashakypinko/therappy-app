import { Controller } from "@nestjs/common";

import { EControllers } from "enums";
import { ServicesService } from "services";

@Controller(EControllers.SERVICES)

export class ServiceController {
  constructor(private readonly servicesService: ServicesService) {}
}
