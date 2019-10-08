import { UpdateReviewAction } from '../constants';

export const actionsToMethods = {
    [UpdateReviewAction.Like]: 'like',
    [UpdateReviewAction.Flag]: 'flag',
  };
