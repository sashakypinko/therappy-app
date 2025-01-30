<?php

namespace App\Repositories\UserSchedulesOverrides;

use App\Models\UserSchedule;
use App\Models\UserScheduleOverrides;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

class Eloquent implements UserSchedulesOverridesRepository
{
	/**
	 * User Model
	 *
	 * @var UserSchedule
	 */
	protected UserScheduleOverrides $model;

    /**
     * Initialize Attributes
     *
     * @param UserScheduleOverrides $model
     */
    public function __construct(UserScheduleOverrides $model)
	{
		$this->model = $model;
	}

    /**
     * @param $id
     * @return Collection|Model
     */
	public function byId($id): Model|Collection
    {
        return $this->model->findOrFail($id);
	}

    /**
     * @param $id
     * @return mixed
     */
    public function byUserId($id): mixed
    {
        return $this->model->where('user_id', $id)->get();
    }

	/**
	 * Stores a resource.
	 *
	 * @param  array $attributes
	 * @return UserScheduleOverrides
     */
	public function store(array $attributes): UserScheduleOverrides
    {
        $schedule = clone $this->model;
        $schedule->fill($attributes);
        $schedule->save();

		return $schedule;
	}

    /**
     * Updates the Resource
     *
     * @param array $attributes
     * @param  $id
     * @return Collection|Model
     */
    public function update(array $attributes, $id): Model|Collection
    {
        $schedule = $this->byId($id);
        $schedule->fill($attributes);
        $schedule->save();

        return $schedule;
    }

    /**
     * Updates the Resource
     *
     * @param array $schedule
     * @param $userId
     * @return array
     */
    public function updateByUser(array $schedule, $userId): array
    {
        $this->clearSchedule($userId);

        $schedule = $this->formatScheduleForDb($schedule, $userId);
        foreach($schedule as $item){
            $this->store($item);
        }

        return $this->formatScheduleForWeb($this->byUserId($userId)->toArray());
     }

    protected function clearSchedule($userId)
    {
        $schedule = $this->byUserId($userId);
        $schedule = $schedule ?? [];
        foreach($schedule as $item){
            $item->delete();
        }
    }

    /**
     * Destroy a resource.
     *
     * @param  $id
     */
	public function destroy($id)
    {
        $schedule = $this->byId($id);
        $schedule->delete();
	}

    public function formatScheduleForWeb(array $schedule): array
    {
        $formattedSchedule = [];
        foreach($schedule as $item){
            $formattedSchedule[$item['date']][] = ['start' => $item['start'], 'end' => $item['end']];
        }

        return $formattedSchedule;
    }

    public function formatScheduleForDb(array $schedule, $userId): array
    {
        $formattedSchedule = [];
        foreach($schedule as $dayKey => $day){
            foreach($day as $item){
                $formattedSchedule[] = ['user_id' => $userId, 'date'=> $dayKey, 'start' => $item['start'], 'end' => $item['end']];
            }
        }

        return $formattedSchedule;
    }

    /**
     * @param int $userId
     * @return void
     */
    public function deleteByUserId(int $userId)
    {
        $this->model->where('user_id', $userId)->delete();
    }

}
