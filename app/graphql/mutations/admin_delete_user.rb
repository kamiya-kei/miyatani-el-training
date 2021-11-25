module Mutations
  class AdminDeleteUser < BaseMutation
    field :user, Types::UserType, null: false

    argument :id, ID, required: true

    def resolve(id:)
      user = context[:user]
      unless user.role.id == Role::ADMIN
        raise GraphQL::ExecutionError, 'admin only'
      end

      target_user = User.find(id)
      target_user.destroy!
      if id == user.id
        context[:session][:user_id] = nil # 自分ならアカウント削除後サインアウト
      end
      {
        user: target_user
      }
    end
  end
end
