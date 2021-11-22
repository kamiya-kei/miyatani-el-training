module Resolvers
  class Users < GraphQL::Schema::Resolver
    type [Types::UserType], null: false

    def resolve
      User.includes(:tasks).order(created_at: 'DESC')
    end
  end
end
