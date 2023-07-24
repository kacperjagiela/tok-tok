export enum FeedType {
  Home = "home",
  Following = "following",
  Mentions = "mentions",
}

export interface FeedProps {
  feedType: FeedType;
}
