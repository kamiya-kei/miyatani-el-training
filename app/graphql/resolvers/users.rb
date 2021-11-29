module Resolvers
  class Users < BaseResolver
    type [Types::UserType], null: false

    def resolve
      authenticate_admin!
      User.includes(:tasks).order(created_at: 'DESC')
    end
  end
end
