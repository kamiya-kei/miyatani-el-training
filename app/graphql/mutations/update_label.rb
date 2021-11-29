module Mutations
  class UpdateLabel < BaseMutation
    field :labels, [Types::LabelType], null: true

    argument :id,   ID,     required: true
    argument :name, String, required: true

    def resolve(id:, name:)
      authenticate_user!

      label = current_user.labels.find(id)
      label.update!(name: name)
      { labels: current_user.labels.order(name: 'ASC') }
    end
  end
end
