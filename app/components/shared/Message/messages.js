import { defineMessages } from 'react-intl';

export const scope = 'app.components.Wrapper';

export default defineMessages({
  malformedUrlTitle: {
    id: `${scope}.malformedUrlTitle`,
    defaultMessage: 'Ops, can\'t retrieve the ID!',
  },
  malformedUrlMessage: {
    id: `${scope}.malformedUrlMessage`,
    defaultMessage: 'This happened because you probably reached this page and didn\'t specify any id for the entry to edit.',
  },
  nonExistentIdTitle: {
    id: `${scope}.nonExistentIdTitle`,
    defaultMessage: 'Selected ID doesn\'t exists in database',
  },
  nonExistentIdMessage: {
    id: `${scope}.nonExistentIdMessage`,
    defaultMessage: 'Unfortunately we were unable to retrieve the data you requested: this happened because the ID you specified for the entry to edit doesn\'t exist.',
  },
  networkErrorTitle: {
    id: `${scope}.networkErrorTitle`,
    defaultMessage: 'Ops, an error occurred!',
  },
  networkErrorMessage: {
    id: `${scope}.networkErrorMessage`,
    defaultMessage: 'It\'s not your fault, but something went wrong: the server can\'t process your request right now.',
  },
  genericSuggestion: {
    id: `${scope}.genericSuggestion`,
    defaultMessage: 'Please, check the URL or use a direct link in the app to select the correct data.',
  },
});
