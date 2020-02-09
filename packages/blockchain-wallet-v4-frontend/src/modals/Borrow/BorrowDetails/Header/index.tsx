import { FormattedMessage } from 'react-intl'
import { OwnProps, SuccessStateType } from '..'
import { Text } from 'blockchain-info-components'
import React from 'react'

type Props = OwnProps & SuccessStateType

const Header: React.FC<Props> = props => {
  return (
    <Text color='grey900' size='20px' weight={600}>
      {props.loan.status === 'PENDING_EXECUTION' ? (
        <FormattedMessage
          id='modals.borrow.newloan'
          defaultMessage='New Loan'
        />
      ) : (
        <FormattedMessage
          id='modals.borrow.details'
          defaultMessage='Borrow Details'
        />
      )}
    </Text>
  )
}

export default Header
