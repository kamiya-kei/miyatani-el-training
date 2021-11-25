module Mutations
  class AdminCreateUser < BaseMutation
    field :user, Types::UserType, null: false

    argument :name,                  String, required: true
    argument :password,              String, required: true
    argument :password_confirmation, String, required: true
    argument :role_id,               ID,     required: true

    def resolve(**args)
      user = context[:session][:user]
      return if user.nil? # TODO: 管理者権限の確認

      target_user = User.create!(args)
      {
        user: target_user
      }
    end
  end
end
