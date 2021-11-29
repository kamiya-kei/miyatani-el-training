module Resolvers
  class UserSignedIn < BaseResolver
    type Types::UserType, null: true

    def resolve
      current_user
    end
  end
end
