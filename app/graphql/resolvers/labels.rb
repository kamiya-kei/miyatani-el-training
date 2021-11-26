module Resolvers
  class Labels < GraphQL::Schema::Resolver
    type [Types::LabelType], null: false

    argument :user_id,   ID,      required: false

    def resolve(user_id: nil)
      user = context[:user]
      if user_id.present? && user.role.id != Role::ADMIN
        raise GraphQL::ExecutionError, 'admin only'
      end

      target_user_id = user_id || user.id

      Label.where(user_id: target_user_id).order(name: 'ASC')
    end
  end
end
