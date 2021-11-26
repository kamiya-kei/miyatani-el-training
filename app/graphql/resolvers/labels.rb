module Resolvers
  class Labels < GraphQL::Schema::Resolver
    type [Types::LabelType], null: false

    def resolve
      user = context[:user]
      Label.where(user_id: user.id).order(name: 'ASC')
    end
  end
end
