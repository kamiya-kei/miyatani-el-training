module Mutations
  class CreateLabel < BaseMutation
    field :label, Types::LabelType, null: true

    argument :name, String, required: true

    def resolve(name:)
      user = context[:user]
      return if user.nil?

      label = user.labels.create(name: name)
      { label: label }
    end
  end
end
