module Mutations
  class DeleteLabel < BaseMutation
    field :label, Types::LabelType, null: true

    argument :id, ID, required: true

    def resolve(id:)
      user = context[:user]
      return if user.nil?

      label = user.labels.find(id)
      label.destroy!
      { label: label }
    end
  end
end
