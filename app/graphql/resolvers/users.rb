module Resolvers
  class Users < GraphQL::Schema::Resolver
    type [Types::UserType], null: false

    def resolve
      user = context[:user]
      unless user.role.id == Role::ADMIN
        raise GraphqlController::AdminAuthorizationError
      end

      User.includes(:tasks).order(created_at: 'DESC')
    end
  end
end
