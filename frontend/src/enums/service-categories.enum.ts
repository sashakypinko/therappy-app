export enum ServiceCategoriesEnum {
  PHYSIOTHERAPY = 1,
  PERSONAL_TRAINER,
  MASSAGE,
  NURSE,
  NUTRITIONIST,
  PODIATRIST,
  ACUPUNCTURE,
  EXERCISE_PHYSIOLOGIST,
  OCCUPATIONAL_THERAPY,
  COUNSELLING,
  COSMETIC_THERAPY,
  STRETCH_THERAPY,
}

export const CategoryLabels = {
  [ServiceCategoriesEnum.PHYSIOTHERAPY]: 'Physiotherapy',
  [ServiceCategoriesEnum.PERSONAL_TRAINER]: 'Personal trainer',
  [ServiceCategoriesEnum.MASSAGE]: 'Massage',
  [ServiceCategoriesEnum.NURSE]: 'Nurse',
  [ServiceCategoriesEnum.NUTRITIONIST]: 'Nutritionist',
  [ServiceCategoriesEnum.PODIATRIST]: 'Podiatrist',
  [ServiceCategoriesEnum.ACUPUNCTURE]: 'Acupuncture',
  [ServiceCategoriesEnum.EXERCISE_PHYSIOLOGIST]: 'Exercise physiologist',
  [ServiceCategoriesEnum.OCCUPATIONAL_THERAPY]: 'Occupational therapy',
  [ServiceCategoriesEnum.COUNSELLING]: 'Counselling',
  [ServiceCategoriesEnum.COSMETIC_THERAPY]: 'Cosmetic Therapy',
  [ServiceCategoriesEnum.STRETCH_THERAPY]: 'Stretch Therapy',
};

export const CategoryImages = {
  [ServiceCategoriesEnum.PHYSIOTHERAPY]: '/img/physiotherapist.png',
  [ServiceCategoriesEnum.PERSONAL_TRAINER]: '/img/personal-trainer.png',
  [ServiceCategoriesEnum.MASSAGE]: '/img/massage.png',
  [ServiceCategoriesEnum.NURSE]: '/img/nurse.png',
  [ServiceCategoriesEnum.NUTRITIONIST]: '/img/nutritionist.png',
  [ServiceCategoriesEnum.PODIATRIST]: '/img/podiatrist.png',
  [ServiceCategoriesEnum.ACUPUNCTURE]: '/img/acupuncture.png',
  [ServiceCategoriesEnum.EXERCISE_PHYSIOLOGIST]: '/img/exercise-physiologist.png',
  [ServiceCategoriesEnum.OCCUPATIONAL_THERAPY]: '/img/occupational-therapy.png',
  [ServiceCategoriesEnum.COUNSELLING]: '/img/councelling.png',
  [ServiceCategoriesEnum.COSMETIC_THERAPY]: '/img/cosmetic-therapy.png',
  [ServiceCategoriesEnum.STRETCH_THERAPY]: '/img/stretech-therapy.png',
};
