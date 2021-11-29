module Types
  class RoleType < Types::BaseObject
    field :id, ID, null: false
    field :text, String, null: false
  end
end
