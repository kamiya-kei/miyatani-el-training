module Mutations
  class CreateLabel < BaseMutation
    field :labels, [Types::LabelType], null: true

    argument :name, String, required: true

    def resolve(name:)
      user = context[:user]
      return if user.nil?

      user.labels.create(name: name)
      { labels: user.labels.order(name: 'ASC') }
    end
  end
end
