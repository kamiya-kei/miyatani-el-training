module Resolvers
  class Tasks < GraphQL::Schema::Resolver
    type [Types::TaskType], null: false

    argument :word, String, required: false
    argument :done_ids, [ID], required: false
    argument :sort_type, String, required: false
    argument :is_asc,    Boolean, required: false
    argument :target,    String,  required: false

    def resolve(**args)
      if args.empty?
        Task.all.order('created_at': 'DESC') 
      else
        Task.search(**args.slice(:word, :target, :done_ids, :sort_type, :is_asc))
      end
    end
  end
end
