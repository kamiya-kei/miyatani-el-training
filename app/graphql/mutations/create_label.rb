module Mutations
  class CreateLabel < BaseMutation
    field :labels, [Types::LabelType], null: true

    argument :name, String, required: true

    def resolve(name:)
      authenticate_user!

      current_user.labels.create(name: name)
      { labels: current_user.labels.order(name: 'ASC') }
    end
  end
end
