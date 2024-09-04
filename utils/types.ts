export interface MMEventDetails {
  title: string;
  _id: string;
  description: string;
  location: string;
  entryCost: number;
  startDate: number;
  endDate: number;
  host: {
    _id: string;
    username: string;
    profilePic: string;
    updatedAt: string;
  };
  attendeeCount: number;
  maxAttendee: number;
  interestedCount: number;
  imageUrl: string;
  nftCtrtId: string;
  createdAt: string;
  updatedAt: string;
  onPress?: () => void;
}

export interface MMEvent {
  _id: string;
  title: string;
  startDate: number;
  host: string;
  attendeeCount: number;
  maxAttendee: number;
  imageUrl: string;
}

export interface RegisterCredentials {
  username: string;
  email: string;
  password: string;
}

export interface Poap {
  _id: string;
  event: string;
  title: string;
  description: string;
  imageUrl: string;
  redemptionStartDate: number;
  redeemDateTime?: number;
  status: 'Pending' | 'Dbput' | 'Minted' | 'Redeemed';
}

export interface PoapCardProp extends Poap {
  onPress: () => void;
  redeemDateTime: NonNullable<Poap['redeemDateTime']>;
}

export interface User {
  _id: string;
  username: string;
  email?: string;
  profilePic: string;
  createdAt?: string;
}

export interface Master extends User {
  followersCount?: 0;
  userGroup?: string;
  isActive?: true;
  createdAt?: string;
  updatedAt?: string;
}
