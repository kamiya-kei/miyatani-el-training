module Resolvers
  class BaseResolver < GraphQL::Schema::Resolver
    include GraphqlHelper
  end
end
