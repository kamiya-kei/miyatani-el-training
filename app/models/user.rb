class User < ApplicationRecord
  # 課題の指定の為、deviseを使用していません
  attr_accessor :password, :password_confirmation

  after_validation :set_encrypted_password

  has_many :tasks, dependent: :destroy

  validates :name, presence: true, uniqueness: true
  validates :password, presence: true, on: :create
  validates :password, length: { in: 6..128 },
                        format: { # 半角英数両方とも含む必要がある
                          with: /\A(?=.*?[a-z])(?=.*?\d)[a-z\d]+\z/i,
                          message: 'is invalid. Include both letters and numbers'
                        },
                        confirmation: true,
                        if: :password_validation?

  def password_validation?
    self.password.present?
  end

  def self.search(name, password)
    user = User.find_by(name: name)
    return unless user.present? && user.compare_password(password)

    user
  end

  def compare_password(secret)
    new_encrypted_password = BCrypt::Password.new(self.encrypted_password)
    self.encrypted_password = new_encrypted_password # 比較の度にハッシュ値を更新
    self.encrypted_password == BCrypt::Engine.hash_secret(secret, new_encrypted_password.salt)
  end

  private

  def set_encrypted_password
    self.encrypted_password = BCrypt::Password.create(password)
  end
end
