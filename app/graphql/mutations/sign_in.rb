module Mutations
  class SignIn < BaseMutation
    field :user,   Types::UserType, null: false

    argument :name,     String, required: true
    argument :password, String, required: true

    def resolve(**args)
      user = User.search(params[:name], params[:password])
      context[:session][:user] = user
      {
        user: user
      }
    end
  end
end
