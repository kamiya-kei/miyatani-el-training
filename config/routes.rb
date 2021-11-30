Rails.application.routes.draw do
  post "/graphql", to: "graphql#execute"
  if Rails.env.development?
    mount GraphiQL::Rails::Engine, at: '/graphiql', graphql_path: '/graphql'
  end

  get '/error500', to: 'react#error500'
  get '/test500',  to: 'react#test500'

  root to: 'react#index'
  get '*path', to: 'react#index'
end
