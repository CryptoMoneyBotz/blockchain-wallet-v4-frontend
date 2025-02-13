import React from 'react'
import { FormattedMessage } from 'react-intl'
import { Field } from 'redux-form'
import styled from 'styled-components'

import { HeartbeatLoader, Text } from 'blockchain-info-components'
import { FormError, FormGroup, FormItem, FormLabel, TextBox } from 'components/Form'
import { Wrapper } from 'components/Public'
import { ExchangeErrorCodes } from 'data/types'
import { required } from 'services/forms'
import { media } from 'services/styles'

import { Props } from '../..'
import {
  ActionButton,
  BackArrowFormHeader,
  ExchangeNeedHelpLink,
  LinkRow,
  removeWhitespace,
  SignUpLink,
  WrapperWithPadding
} from '../../model'

const LoginWrapper = styled(Wrapper)`
  padding: 32px 0 24px;
`
const TwoFAExchange = (props: Props) => {
  const {
    authActions,
    busy,
    exchangeError,
    formValues,
    handleBackArrowClick,
    invalid,
    submitting
  } = props
  const twoFactorError = exchangeError && exchangeError === ExchangeErrorCodes.WRONG_2FA

  return (
    <LoginWrapper>
      <WrapperWithPadding>
        <BackArrowFormHeader {...props} handleBackArrowClick={handleBackArrowClick} hideGuid />
        <FormGroup>
          <FormItem>
            <FormLabel htmlFor='code'>
              <FormattedMessage
                id='scenes.logins.twofa.enter_code'
                defaultMessage='Enter your Two Factor Authentication Code'
              />
            </FormLabel>
            <Field
              name='exchangeTwoFA'
              normalize={removeWhitespace}
              validate={[required]}
              component={TextBox}
              noLastPass
              autoFocus
              data-e2e='loginTwoFactorCode'
            />
            {twoFactorError && (
              <FormError position='absolute'>
                <FormattedMessage
                  id='scenes.login.exchange.incorrect_code'
                  defaultMessage='Incorrect code'
                />
              </FormError>
            )}
          </FormItem>
        </FormGroup>
        <LinkRow>
          <ActionButton
            type='submit'
            nature='primary'
            fullwidth
            height='48px'
            disabled={submitting || invalid || busy || !formValues?.exchangeTwoFA}
            data-e2e='loginButton'
            style={{ marginBottom: '16px' }}
          >
            {submitting ? (
              <HeartbeatLoader height='20px' width='20px' color='white' />
            ) : (
              <Text color='whiteFade900' size='16px' weight={600}>
                <FormattedMessage id='buttons.continue' defaultMessage='Continue' />
              </Text>
            )}
          </ActionButton>
          <ExchangeNeedHelpLink authActions={authActions} origin='2FA' />
        </LinkRow>
      </WrapperWithPadding>
      <SignUpLink />
    </LoginWrapper>
  )
}

export default TwoFAExchange
