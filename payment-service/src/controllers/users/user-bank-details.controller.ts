import { Controller } from "@nestjs/common";

import { EControllers } from "enums";
import { UsersBankDetailsService } from "services";

@Controller(EControllers.USER_BANK_DETAILS)

export class UserBankDetailsController {
  constructor(private readonly usersBankDetailsService: UsersBankDetailsService) {}
}
