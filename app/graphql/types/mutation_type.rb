module Types
  class MutationType < Types::BaseObject
    field :admin_delete_user, mutation: Mutations::AdminDeleteUser
    field :admin_update_user, mutation: Mutations::AdminUpdateUser
    field :admin_create_user, mutation: Mutations::AdminCreateUser
    field :delete_user, mutation: Mutations::DeleteUser
    field :sign_out, mutation: Mutations::SignOut
    field :sign_in, mutation: Mutations::SignIn
    field :create_user, mutation: Mutations::CreateUser
    field :delete_task, mutation: Mutations::DeleteTask
    field :update_task, mutation: Mutations::UpdateTask
    field :create_task, mutation: Mutations::CreateTask
  end
end
