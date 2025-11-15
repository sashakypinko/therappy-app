export default interface ReviewRequestDto {
  comment: string;
  rating: number;
  blockUser?: boolean;
  author?: number;
}
