import { ProviderPreferencesEnum } from '../../../../enums/provider-preferences.enum';

export interface SignUpProviderDetailsRequestDto {
  preferences: ProviderPreferencesEnum[];
  first_referee_name?: string;
  second_referee_name?: string;
  first_referee_phone?: string;
  second_referee_phone?: string;
}
