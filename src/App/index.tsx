import React, { useEffect } from 'react'
import { useAppState } from '@ryotamurakami/react-appstate'
import Header from './Header'
import TodoList from './TodoList'
import Footer from './Footer'
import { Routes, AppState } from '../index'
import { RouteComponentProps } from '@reach/router'
import { Layout } from './style'

export enum LocalStorageKey {
  APP_STATE = 'APP_STATE'
}

interface Props {
  path: Routes
}

const App: React.FC<Props & RouteComponentProps> = ({ path }) => {
  const [appState] = useAppState<AppState>()

  // preserve every appState changes.
  useEffect((): void => {
    window.localStorage.setItem(
      LocalStorageKey.APP_STATE,
      JSON.stringify(appState)
    )
  }, [appState])

  return (
    <Layout>
      <section className="todoapp">
        <Header />
        {appState.todoList.length ? (
          <>
            <TodoList path={path} />
            <Footer path={path} />
          </>
        ) : null}
      </section>
      <footer className="info">
        <p>
          Created by{' '}
          <a href="https://ryota-murakami.github.io/">Ryota Murakamai</a>
        </p>
        <p>
          Part of <a href="http://todomvc.com">Doublenian TodoMVC</a>
        </p>
      </footer>
    </Layout>
  )
}

export default App
