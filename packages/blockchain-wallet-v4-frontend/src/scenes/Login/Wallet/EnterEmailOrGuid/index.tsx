import React from 'react'
import { FormattedMessage } from 'react-intl'
import { Field } from 'redux-form'
import styled from 'styled-components'

import { HeartbeatLoader, Image, Text } from 'blockchain-info-components'
import { FormGroup, FormItem, TextBox } from 'components/Form'
import { Wrapper } from 'components/Public'
import { ProductAuthOptions } from 'data/types'
import { isBrowserSupported } from 'services/browser'
import { required, validWalletIdOrEmail } from 'services/forms'
import { media } from 'services/styles'

import { Props } from '../..'
import {
  ActionButton,
  GuidError,
  LinkRow,
  LoginFormLabel,
  ProductTab,
  removeWhitespace,
  SignUpLink,
  TabWrapper,
  UnsupportedBrowserWarning,
  WalletNeedHelpLink,
  WrapperWithPadding
} from '../../model'

const LoginWrapper = styled(Wrapper)`
  display: flex;
  flex-direction: column;
  padding: 0 0 24px 0;
  ${media.mobile`
  padding: 0 0 16px 0;
`}
`

const isSupportedBrowser = isBrowserSupported()

const EnterEmailOrGuid = (props: Props) => {
  const { authActions, busy, formValues, invalid, submitting, walletError } = props
  const guidError = walletError && walletError.toLowerCase().includes('unknown wallet id')
  const onExchangeTabClick = () => {
    props.routerActions.push('/login?product=exchange')
    authActions.setProductAuthMetadata({ product: ProductAuthOptions.EXCHANGE })
  }
  return (
    <LoginWrapper>
      <TabWrapper>
        <ProductTab product={ProductAuthOptions.WALLET}>
          <Image name='wallet-no-background' height='28px' style={{ marginRight: '12px' }} />
          <Text size='20px' weight={600} color='purple600'>
            <FormattedMessage id='copy.wallet' defaultMessage='Wallet' />
          </Text>
        </ProductTab>
        <ProductTab
          backgroundColor='grey000'
          onClick={onExchangeTabClick}
          product={ProductAuthOptions.EXCHANGE}
        >
          <Image name='exchange-grayscale' height='26px' style={{ marginRight: '12px' }} />
          <Text size='20px' weight={600} color='grey400'>
            <FormattedMessage id='copy.exchange' defaultMessage='Exchange' />
          </Text>
        </ProductTab>
      </TabWrapper>
      <WrapperWithPadding>
        <FormGroup>
          {!isSupportedBrowser && <UnsupportedBrowserWarning />}
          <FormItem style={{ marginTop: '40px' }}>
            <LoginFormLabel htmlFor='guid'>
              <FormattedMessage
                id='scenes.login.email_guid'
                defaultMessage='Your Email or Wallet ID'
              />
            </LoginFormLabel>
            <Field
              component={TextBox}
              data-e2e='loginGuidOrEmail'
              disabled={!isSupportedBrowser}
              disableSpellcheck
              name='guidOrEmail'
              normalize={removeWhitespace}
              validate={[required, validWalletIdOrEmail]}
              placeholder='Enter your email or wallet ID'
              autoFocus
            />
          </FormItem>
          {guidError && (
            <GuidError inline>
              <Text size='12px' color='error' weight={400} data-e2e='walletIdError'>
                <FormattedMessage
                  id='scenes.login.guid_error'
                  defaultMessage='Unknown Wallet ID. Please check that it was entered correctly or try signing in with your email.'
                />
              </Text>
            </GuidError>
          )}
        </FormGroup>
        <LinkRow>
          <ActionButton
            type='submit'
            nature='primary'
            fullwidth
            height='48px'
            disabled={submitting || invalid || busy || !formValues?.guidOrEmail}
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
          <WalletNeedHelpLink authActions={authActions} origin='IDENTIFIER' />
        </LinkRow>
      </WrapperWithPadding>
      <SignUpLink />
    </LoginWrapper>
  )
}

export default EnterEmailOrGuid
