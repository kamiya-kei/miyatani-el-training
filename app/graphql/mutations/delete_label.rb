module Mutations
  class DeleteLabel < BaseMutation
    field :labels, [Types::LabelType], null: true

    argument :id, ID, required: true

    def resolve(id:)
      authenticate_user!

      label = current_user.labels.find(id)
      label.destroy!
      { labels: current_user.labels.order(name: 'ASC') }
    end
  end
end
