import React from 'react'
import './homePage.scss'
import { Segment, Container, Header, Button, Icon } from 'semantic-ui-react'

const HomePage = ({history}) => {
    return (
        <Segment textAlign='center' vertical className='masthead'>
        <Container text>
          <Header as='h1'>
            (Prze)przepisy
          </Header>
          <Header as='h2'>
            Rozsmakuj się w prze-przepisach i poznaj prze-ludzi!
          </Header>
          <Button size='huge' inverted onClick={() => history.push('/przepisy')}>
            Sprawdź!
            <Icon name='right arrow' />
          </Button>
        </Container>
      </Segment>
    )
}

export default HomePage
