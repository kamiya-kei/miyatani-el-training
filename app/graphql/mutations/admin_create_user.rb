module Mutations
  class AdminCreateUser < BaseMutation
    field :user, Types::UserType, null: false

    argument :name,                  String, required: true
    argument :password,              String, required: true
    argument :password_confirmation, String, required: true
    argument :role_id,               ID,     required: true

    def resolve(**args)
      user = context[:user]
      unless user.role.id == Role::ADMIN
        raise GraphQL::ExecutionError, 'admin only'
      end

      target_user = User.create!(args)
      {
        user: target_user
      }
    end
  end
end
