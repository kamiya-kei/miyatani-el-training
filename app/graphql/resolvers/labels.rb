module Resolvers
  class Labels < BaseResolver
    type [Types::LabelType], null: false

    argument :user_id,   ID, required: false

    def resolve(user_id: nil)
      Label.where(user_id: target_user_id!(user_id)).order(name: 'ASC')
    end
  end
end
