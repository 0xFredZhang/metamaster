import CardRow from './cardRow';
import { PoapCardProp } from '@utils/types';
import { getDateString } from '@utils/utils';

const PoapCard = (props: PoapCardProp) => {
  const { onPress, ...poap } = props;

  return (
    <CardRow
      onPress={onPress}
      heading={props.title}
      subheading={{
        label: 'Collected',
        data: getDateString(poap.redeemDateTime),
      }}
      imageURI={props.imageUrl}
    />
  );
};

export default PoapCard;
