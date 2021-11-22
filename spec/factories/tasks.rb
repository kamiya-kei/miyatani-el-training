FactoryBot.define do
  factory :task do
    title { Faker::Lorem.sentence }
    description { Faker::Lorem.sentence }
    done_id { Done.pluck(:id).sample }
    priority_number { [0, 1, 2].sample }
    deadline { Random.rand(Time.current.since(1.month)..Time.current.since(3.months)) }
    created_at { Random.rand(Time.current.ago(1.month)..Time.current) }
  end
end
