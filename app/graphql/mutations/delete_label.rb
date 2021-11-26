module Mutations
  class DeleteLabel < BaseMutation
    field :labels, [Types::LabelType], null: true

    argument :id, ID, required: true

    def resolve(id:)
      user = context[:user]
      return if user.nil?

      label = user.labels.find(id)
      label.destroy!
      { labels: user.labels.order(name: 'ASC') }
    end
  end
end
