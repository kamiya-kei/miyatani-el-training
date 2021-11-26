module Mutations
  class UpdateLabel < BaseMutation
    field :label, Types::LabelType, null: true

    argument :id,   ID,     required: true
    argument :name, String, required: true

    def resolve(id:, name:)
      user = context[:user]
      return if user.nil?

      label = user.labels.find(id)
      label.update!(name: name)
      { label: label }
    end
  end
end
