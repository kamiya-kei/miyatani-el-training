module Mutations
  class AdminUpdateUser < BaseMutation
    field :user, Types::UserType, null: false

    argument :id, ID, required: true
    argument :name,                  String, required: false
    argument :password,              String, required: false
    argument :password_confirmation, String, required: false
    argument :role_id,               ID,     required: false

    def resolve(id:, **args)
      user = context[:session][:user]
      return if user.nil? # TODO: 管理者権限の確認

      target_user = User.find(id)
      target_user.update!(args)
      {
        user: target_user
      }
    end
  end
end
