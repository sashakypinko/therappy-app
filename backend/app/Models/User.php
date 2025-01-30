<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Scopes\DeletedUserScope;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\DB;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    const TYPE_ADMIN = 1;
    const TYPE_THERAPIST = 2;
    const TYPE_CLIENT = 3;

    const STATUS_NEW = 0;
    const STATUS_PENDING = 1;
    const STATUS_APPROVED = 2;
    const STATUS_ACTIVE = 3;
    const STATUS_DECLINED = 4;
    const STATUS_DELETED = 5;


    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'first_name',
        'last_name',
        'status',
        'email',
        'password',
        'type',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes
     *
     * @var array<int, string>
     */
    protected $appends = [
        'image_id',
        'image_url',
        'is_rate_us'
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    /**
     * The "booting" method of the model.
     *
     * @return void
     */
    protected static function boot(): void
    {
        parent::boot();

        //static::addGlobalScope(new DeletedUserScope);
    }

    public function getIsRateUsAttribute(): bool
    {
        return !is_null($this->getAttribute('rate_us_at')) && $this->getAttribute('rate_us_at') < Carbon::now();
    }

    public function getImageIdAttribute()
    {
        $image = DB::table('user_details')->select('image_id')->where('user_id', $this->getAttribute('id'))->first();
        return $image?->image_id;
    }

    public function getImageUrlAttribute(): string|null
    {
        $image_id = $this->getAttribute('image_id');
        return $image_id ? route('api.media.get', ['id' => $image_id]) : null;
    }

    public function details(): \Illuminate\Database\Eloquent\Relations\HasOne
    {
        return $this->hasOne(UserDetails::class, 'user_id', 'id');
    }

    public function bank_details(): \Illuminate\Database\Eloquent\Relations\HasOne
    {
        return $this->hasOne(UserBankDetails::class, 'user_id', 'id');
    }

    public function services(): \Illuminate\Database\Eloquent\Relations\MorphToMany
    {
        return $this->morphToMany(Service::class, 'user', 'user_services');
    }

    public function schedule(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(UserSchedule::class, 'user_id', 'id');
    }

    public function schedule_overrides(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(UserScheduleOverrides::class, 'user_id', 'id');
    }

    public function attachments(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(Media::class, 'user_id', 'id')->where('medias.type', '=', Media::TYPE_ATTACHMENT);
    }

    public function additionals(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->HasMany(UserAdditional::class, 'user_id', 'id');
    }

    public function wrote_reviews(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->HasMany(AppointmentReview::class, 'user_id', 'id');
    }

    public function reviews(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->HasMany(AppointmentReview::class, 'target_id', 'id');
    }

    public function reviews_count(): int
    {
        return $this->HasMany(AppointmentReview::class, 'target_id', 'id')->count('id');
    }

    public function rating(): float
    {
        $count = $this->reviews_count();
        return $count ? round($this->HasMany(AppointmentReview::class, 'target_id', 'id')->sum('rating')/$count, 1,  PHP_ROUND_HALF_UP) : 0;
    }

    public static function isUserType($userTypeId): bool
    {
        $user = auth('api')->user();
        return $user && $user->type === $userTypeId;
    }

    public function isAdmin(): bool
    {
        return self::isUserType(self::TYPE_ADMIN);
    }

    public function isTherapist($id = null): bool
    {
        return self::isUserType(self::TYPE_THERAPIST);
    }

    public function isCustomer(): bool
    {
        return self::isUserType(self::TYPE_CLIENT);
    }




}
