import * as Yup from 'yup';
import { IAdditional } from '../../additional/dto/additional.dto';

export const getDocumentValidationRules = (additionalList: IAdditional[]) => {
  const rules: { [key: number | string]: any } = {};

  additionalList
    .filter(({ is_file, is_multiple }) => is_file === 1 && !is_multiple)
    .forEach(({ id, customer_title }) => {
      const documentKey = id;

      rules[documentKey] = Yup.mixed().test(
        `test-${documentKey}`,
        `Please upload ${customer_title}`,
        ({ file }: any = {}) => !!file,
      );
    });

  return rules;
};

const providerValidationSchema = (additionalList: IAdditional[]) =>
  Yup.object().shape({
    first_name: Yup.string().required(() => 'Please enter your first name'),
    last_name: Yup.string().required(() => 'Please enter your last name'),
    additionals: Yup.object().shape(getDocumentValidationRules(additionalList)),
    details: Yup.object({
      phone: Yup.string().required(() => 'Please enter your phone number'),
      abn: Yup.number()
        .min(11, () => 'ABN must be 11 characters')
        .required(() => 'Please enter your ABN'),
      has_bank_details: Yup.boolean().isTrue(() => 'Please set your bank details'),
    }),
    services: Yup.array().min(1, () => 'Please select at least one service'),
  });

export default providerValidationSchema;
