import { Controller } from "@nestjs/common";

import { EControllers } from "enums";
import { AppointmentsService } from "services";

@Controller(EControllers.APPOINTMENTS)

export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}
}
