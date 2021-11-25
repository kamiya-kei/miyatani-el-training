module Resolvers
  class Users < GraphQL::Schema::Resolver
    type [Types::UserType], null: false

    def resolve
      user = User.find(context[:session][:user]['id'])
      # TODO: 管理者権限の確認

      User.includes(:tasks).order(created_at: 'DESC')
    end
  end
end
