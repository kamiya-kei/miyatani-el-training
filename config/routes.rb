Rails.application.routes.draw do
  post "/graphql", to: "graphql#execute"
  if Rails.env.development?
    mount GraphiQL::Rails::Engine, at: '/graphiql', graphql_path: '/graphql'
  end

  scope :users, format: 'json' do
    # post 'sign_up',  to: 'users#sign_up'
    post 'sign_in',  to: 'users#sign_in'
    post 'signed_in', to: 'users#signed_in'
    post 'sign_out', to: 'users#sign_out'
  end

  root to: 'react#index'
  get '*path', to: 'react#index'
end
